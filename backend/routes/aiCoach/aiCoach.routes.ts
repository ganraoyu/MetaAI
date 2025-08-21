import { Router, Request, Response, NextFunction } from "express";
import { chatWithCoach } from "../../controllers/aiCoach/aiCoach";

const router = Router();

router.post("/chat", async (req: Request, res: Response, next: NextFunction) => {
  try {
	await chatWithCoach(req, res);
  } catch (error) {
	next(error);
  }
});

export default router;
