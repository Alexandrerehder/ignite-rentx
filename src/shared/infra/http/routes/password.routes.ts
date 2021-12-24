import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.use("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.use("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
