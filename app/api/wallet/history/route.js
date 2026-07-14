import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import User from "@/models/User";
import UsdtDeposit from "@/models/UsdtDeposit";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            const token = auth.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const { userId } = decoded;

        /* ================= QUERY PARAMS ================= */
        const { searchParams } = new URL(req.url);
        const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
        const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
        const skip = (page - 1) * limit;
        const filter = searchParams.get("filter") || "all"; // all, inr, usdt
        const status = searchParams.get("status") || "all";
        const search = searchParams.get("search") || "";
        const filterType = searchParams.get("type") || "all";

        /* ================= QUERY ================= */
        // Try findById first (since decoded.userId is typically the _id)
        let user = null;
        if (mongoose.isValidObjectId(decoded.userId)) {
            user = await User.findById(decoded.userId);
        }
        if (!user) {
            user = await User.findOne({ userId: decoded.userId });
        }

        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "User not found or token stale", 
                debugId: decoded.userId 
            }, { status: 401 });
        }

        let conditions = [
            {
                $or: [
                    { userId: user.userId }, // Custom ID
                    { userObjectId: user._id } // Mongo ID
                ]
            }
        ];

        if (filter === "inr") {
            conditions.push({ referenceId: { $not: /^USDT/ } });
        } else if (filter === "usdt") {
            conditions.push({ referenceId: /^USDT/ });
        }

        if (status !== "all") {
            conditions.push({ status });
        }

        if (filterType !== "all") {
            conditions.push({ type: filterType });
        }

        if (search) {
            conditions.push({
                $or: [
                    { transactionId: { $regex: search, $options: "i" } },
                    { referenceId: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            });
        }

        let txnQuery = { $and: conditions };

        let usdtConditions = [
            {
                $or: [
                    { userId: user.userId }, // Custom ID
                    { userObjectId: user._id } // Mongo ID
                ]
            }
        ];

        if (status !== "all") {
            if (status === "success") usdtConditions.push({ status: "confirmed" });
            else if (status === "pending") usdtConditions.push({ status: { $in: ["waiting", "submitted"] } });
            else if (status === "failed") usdtConditions.push({ status: { $in: ["failed", "expired"] } });
        } else {
            usdtConditions.push({ status: { $in: ["waiting", "submitted", "confirmed", "failed", "expired"] } });
        }

        if (filterType === "debit") {
            // USDT deposits are always credits, so if debit is selected, match nothing
            usdtConditions.push({ _id: null });
        }

        if (search) {
            usdtConditions.push({
                $or: [
                    { depositId: { $regex: search, $options: "i" } },
                    { network: { $regex: search, $options: "i" } }
                ]
            });
        }

        let usdtQuery = { $and: usdtConditions };

        const baseQuery = {
            $or: [
                { userId: user.userId }, // Custom ID
                { userObjectId: user._id } // Mongo ID
            ]
        };

        // Update any waiting USDT deposits that have expired
        const now = new Date();
        await UsdtDeposit.updateMany(
            { 
                ...baseQuery,
                status: "waiting", 
                expiresAt: { $lt: now } 
            },
            { $set: { status: "expired" } }
        );

        const [transactions, usdtDeposits, totalTransactionCount] = await Promise.all([
            WalletTransaction.find(txnQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select("-userObjectId -__v")
                .lean(),
            (filter === "all" || filter === "usdt") 
                ? UsdtDeposit.find(usdtQuery).lean() 
                : Promise.resolve([]),
            WalletTransaction.countDocuments(txnQuery),
        ]);

        // Merge and Map
        const mappedUsdt = usdtDeposits
            .filter(d => d.status !== "confirmed") // confirmed ones are already in WalletTransaction
            .map(d => ({
                _id: d._id,
                transactionId: d.depositId,
                type: "credit",
                amount: d.coinsToCredit,
                description: `USDT Deposit (${d.usdtAmount} USDT via ${d.network})`,
                status: d.status === "submitted" ? "pending" : d.status, // submitted -> pending, others kept as is
                createdAt: d.createdAt,
                updatedAt: d.updatedAt,
                isUsdt: true
            }));

        const combined = [...mappedUsdt, ...transactions]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);

        /* ================= RESPONSE ================= */
        return NextResponse.json({
            success: true,
            data: combined,
            pagination: {
                total: totalTransactionCount + mappedUsdt.length,
                page,
                limit,
                totalPages: Math.ceil((totalTransactionCount + mappedUsdt.length) / limit),
            },
        });
    } catch (err) {
        console.error("User wallet history fetch failed", err);
        return NextResponse.json(
            { success: false, message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}
