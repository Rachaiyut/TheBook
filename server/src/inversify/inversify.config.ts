import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "@inversify/types";

//Provider
import Express from "@provider/Express";
import App from "@provider/App";

// Models
import {
    UserModel,
    BookModel,
    OrderModel,
    OrderItemsModel,
    VerificationTokenModel
} from "@infrastructure/models/index";

//Repositories
import {
    UserRepository,
    BookRepository,
    OrderRepository,
    OrderItemsRepository,
    VerificationTokenRepository
} from "@infrastructure/repositories/index"

//Services
import {
    BookService,
    UserService,
    OrderService,
    PaymentService,
    VerificationTokenService
} from "@application/services/api/index";
import {
    JWTService,
    PasswordService,
    AuthService,
    RoleService
} from "@application/services/auth/index";

// Use-Cases
import {
    Register,
    Login,
    RefreshToken,
    UserVerify,
} from "@application/use-cases/auth/index";
import {
    DeleteUser,
    GetAllUsers,
    UpdateUser
} from "@application/use-cases/user/index";
import {
    CreateBook,
    GetAllBooks,
    UpdateBook,
    GetBook,
    GetTop5Books,
    GetNewBooks
} from "@application/use-cases/book/index";
import {
    CreateOrder,
    GetAllOrder,
    GetOrder,
    UpdateOrder
} from "@application/use-cases/order/index";

// Outer Use-Cases
import { Checkout, Webhook } from "@application/use-cases/payment/index";

//Middlewares
import {
    JwtMiddleware,
    ProtectMiddleware,
} from "@presentation/middlewares/index";

// OuterService
import GoogleStragy from "@infrastructure/services/auth/strategies/googleStrategy";
import Passport from "@infrastructure/services/auth/passport/passport";
import StripeService from "@infrastructure/services/Stripe/StripeService";
import EmailService from "@application/services/api/EmailService";
import EmailFactory from "@infrastructure/services/notification/email/factories/EmailFactory";

import { LoginConfirmationEmail, RegisterConfirmationEmail } from "@infrastructure/services/notification/email/service/auth/index";
import { CryptoService, EncryptionService, HashService } from "@infrastructure/services/crypto/index";

export class DIContainer {


    public container: Container;


    constructor() {
        this.container = new Container();
        this.configure();
    }


    private configure() {
        // Provider    
        this.configureApp()
        this.configureExpress();

        // Repositpry
        this.configureRepository();

        // Model
        this.configureModels();

        // Services
        this.configureServices();

        // Outer Services
        this.configureOuterService();

        // Usecase
        this.configureUsecase();

        // Outer Use-Cases
        this.configureOuterUsecase();

        // Factory
        this.configFactory();

        // Stragies
        this.stragies();


        // Middleware
        this.middleware();
    }


    private configureExpress() {
        this.container.bind<Express>(TYPES.Express).to(Express);
    }


    private configureApp() {

        // this.container.bind<App>(TYPES.App).toDynamicValue(context => {
        //     const express = context.container.get<Express>(TYPES.Express);
        //     return new App(express);
        // });

        this.container.bind<App>(TYPES.App).to(App)
    }


    private configureModels() {
        this.container.bind<typeof BookModel>(TYPES.BookModel).toConstantValue(BookModel);
        this.container.bind<typeof UserModel>(TYPES.UserModel).toConstantValue(UserModel);
        this.container.bind<typeof OrderModel>(TYPES.OrderModel).toConstantValue(OrderModel);
        this.container.bind<typeof OrderItemsModel>(TYPES.OrderItemsModel).toConstantValue(OrderItemsModel);
        this.container.bind<typeof VerificationTokenModel>(TYPES.VerificationTokenModel).toConstantValue(VerificationTokenModel)
    }


    private configureRepository() {
        this.container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
        this.container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
        this.container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository);
        this.container.bind<OrderItemsRepository>(TYPES.OrderItemsRepository).to(OrderItemsRepository);
        this.container.bind<VerificationTokenRepository>(TYPES.VerificationTokenRepository).to(VerificationTokenRepository);
    }


    private configureServices() {
        this.container.bind<UserService>(TYPES.UserService).to(UserService);
        this.container.bind<BookService>(TYPES.BookService).to(BookService);
        this.container.bind<OrderService>(TYPES.OrderService).to(OrderService)
        this.container.bind<JWTService>(TYPES.JWTService).to(JWTService);
        this.container.bind<PasswordService>(TYPES.PasswordService).to(PasswordService);
        this.container.bind<AuthService>(TYPES.AuthService).to(AuthService);
        this.container.bind<RoleService>(TYPES.RoleService).to(RoleService);
        this.container.bind<PaymentService>(TYPES.PaymentService).to(PaymentService);
        this.container.bind<VerificationTokenService>(TYPES.VerificationTokenService).to(VerificationTokenService);
    }


    private configureOuterService() {
        this.container.bind<GoogleStragy>(TYPES.GoogleStragy).to(GoogleStragy);
        this.container.bind<StripeService>(TYPES.StripeService).to(StripeService);
        this.container.bind<EmailService>(TYPES.EmailService).to(EmailService);
        // this.container.bind<CryptoService>(TYPES.CryptoService).to(CryptoService);
        this.container.bind<EncryptionService>(TYPES.EncryptionService).to(EncryptionService);
        this.container.bind<HashService>(TYPES.HashService).to(HashService);
    }


    private configureOuterUsecase() {
        this.container.bind<Checkout>(TYPES.Checkout).to(Checkout);
        this.container.bind<Webhook>(TYPES.Webhook).to(Webhook);
    }


    private configureUsecase() {
        //Auth
        this.container.bind<Register>(TYPES.Register).to(Register);
        this.container.bind<Login>(TYPES.Login).to(Login)
        this.container.bind<RefreshToken>(TYPES.RefreshToken).to(RefreshToken)
        this.container.bind<UserVerify>(TYPES.UserVerify).to(UserVerify)

        //User
        this.container.bind<GetAllUsers>(TYPES.GetAllUsers).to(GetAllUsers);
        this.container.bind<UpdateUser>(TYPES.UpdateUser).to(UpdateUser);
        this.container.bind<DeleteUser>(TYPES.DeleteUser).to(DeleteUser);

        //Book
        this.container.bind<CreateBook>(TYPES.CreateBook).to(CreateBook);
        this.container.bind<GetAllBooks>(TYPES.GetAllBooks).to(GetAllBooks);
        this.container.bind<UpdateBook>(TYPES.UpdateBook).to(UpdateBook);
        this.container.bind<GetBook>(TYPES.GetBook).to(GetBook);
        this.container.bind<GetTop5Books>(TYPES.GetTop5Books).to(GetTop5Books);
        this.container.bind<GetNewBooks>(TYPES.GetNewBooks).to(GetNewBooks);

        //Order
        this.container.bind<CreateOrder>(TYPES.CreateOrder).to(CreateOrder);
        this.container.bind<GetAllOrder>(TYPES.GetAllOrder).to(GetAllOrder);
        this.container.bind<GetOrder>(TYPES.GetOrder).to(GetOrder);
        this.container.bind<UpdateOrder>(TYPES.UpdateOrder).to(UpdateOrder);
    }

    private configFactory() {
        this.container.bind<EmailFactory>(TYPES.EmailFactory).to(EmailFactory);
    }

    private stragies() {
        this.container.bind<LoginConfirmationEmail>(TYPES.LoginConfirmationEmail).to(LoginConfirmationEmail);
        this.container.bind<RegisterConfirmationEmail>(TYPES.RegisterConfirmationEmail).to(RegisterConfirmationEmail);
    }

    private middleware() {
        this.container.bind<JwtMiddleware>(TYPES.JwtMiddleware).to(JwtMiddleware);
        this.container.bind<ProtectMiddleware>(TYPES.ProtectMiddleware).to(ProtectMiddleware);
        this.container.bind<Passport>(TYPES.Passport).to(Passport)
    }

    public getContainer() {
        return this.container;
    }
}

export default new DIContainer();