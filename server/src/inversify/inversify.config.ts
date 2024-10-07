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
    OrderItemsModel
} from "@infrastructure/models/index";

//Repositories
import {
    UserRepository,
    BookRepository,
    OrderRepository,
    OrderItemsRepository
} from "@infrastructure/repositories/index"

//Services
import {
    BookService,
    UserService,
    OrderService
} from "@application/services/api/index";
import {
    JWTService,
    PasswordService,
    AuthService,
    RoleService
} from "@application/services/auth/index";

//Use-Cases
import { Register, Login } from "@application/use-cases/auth/index";
import { DeleteUser, GetAllUsers, UpdateUser } from "@application/use-cases/user/index";
import {
    CreateBook,
    GetAllBooks,
    UpdateBook,
    GetBook,
    GetTop5Books,
    GetNewBooks
} from "@application/use-cases/book/index";
import { CreateOrder, GetAllOrder } from "@application/use-cases/order/index";

//Middlewares
import {
    JwtMiddleware,
    ProtectMiddleware,
} from "@presentation/middlewares/index";


export class DIContainer {
    public container: Container;

    constructor() {
        this.container = new Container();
        this.configure();
    }

    private configure() {
        //Provider    
        this.configureApp()
        this.configureExpress();

        //Repositpry
        this.configureRepository();

        //Model
        this.configureModels();

        //Services
        this.configureServices();

        //Usecase
        this.configureUsecase();

        //Middleware
        this.middleware();
    }

    private configureExpress() {
        this.container.bind<Express>(TYPES.Express).to(Express);
    }

    private configureApp() {

        this.container.bind<App>(TYPES.App).toDynamicValue(context => {
            const express = context.container.get<Express>(TYPES.Express);
            return new App(express);
        });
    }

    private configureModels() {
        this.container.bind<typeof BookModel>(TYPES.BookModel).toConstantValue(BookModel);
        this.container.bind<typeof UserModel>(TYPES.UserModel).toConstantValue(UserModel);
        this.container.bind<typeof OrderModel>(TYPES.OrderModel).toConstantValue(OrderModel);
        this.container.bind<typeof OrderItemsModel>(TYPES.OrderItemsModel).toConstantValue(OrderItemsModel);
    }

    private configureRepository() {
        this.container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
        this.container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
        this.container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository);
        this.container.bind<OrderItemsRepository>(TYPES.OrderItemsRepository).to(OrderItemsRepository)
    }

    private configureServices() {
        this.container.bind<UserService>(TYPES.UserService).to(UserService);
        this.container.bind<BookService>(TYPES.BookService).to(BookService);
        this.container.bind<OrderService>(TYPES.OrderService).to(OrderService)
        this.container.bind<JWTService>(TYPES.JWTService).to(JWTService);
        this.container.bind<PasswordService>(TYPES.PasswordService).to(PasswordService);
        this.container.bind<AuthService>(TYPES.AuthService).to(AuthService);
        this.container.bind<RoleService>(TYPES.RoleService).to(RoleService);
    }

    private configureUsecase() {
        //Auth
        this.container.bind<Register>(TYPES.Register).to(Register);
        this.container.bind<Login>(TYPES.Login).to(Login)

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
    }

    private middleware() {
        this.container.bind<JwtMiddleware>(TYPES.JwtMiddleware).to(JwtMiddleware);
        this.container.bind<ProtectMiddleware>(TYPES.ProtectMiddleware).to(ProtectMiddleware);
    }

    public getContainer() {
        return this.container;
    }
}

export default new DIContainer();