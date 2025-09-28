import { connectDB } from "../../database/db";

export class LeaderboardRepository {
  static async getAll() {
    const db = await connectDB();

    const leaderboardCollection = db.db("SET15").collection("leaderboard");
    
    return leaderboardCollection.find().toArray();
  };

  private static async updateMany(leaderboardRanking: any[]) {

  }
};