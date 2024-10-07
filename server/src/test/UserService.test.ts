// // UserService.test.ts
// import { UserService } from '@application/services/api/index';
// import JWTService from '@application/services/auth/JWTService';
// import { UserRepository } from '@infrastructure/repositories/index';
// import { UserMapper } from '@application/mappers/UserMapper';
// import { IUserRegisterResponseDTO, IRegisterDTO } from '@application/dtos/index';

// // Mock the dependencies
// jest.mock('../repositories/UserRepository');
// jest.mock('../services/JWTService');
// jest.mock('../mappers/UserMapper');

// describe('UserService', () => {
//     let userService: UserService;
//     let mockUserRepository: jest.Mocked<UserRepository>;
//     let mockJWTService: jest.Mocked<JWTService>;
//     let mockUserMapper: jest.Mocked<typeof UserMapper>;

//     beforeEach(() => {
//         mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
//         mockJWTService = new JWTService() as jest.Mocked<JWTService>;
//         mockUserMapper = UserMapper as jest.Mocked<typeof UserMapper>;

//         userService = new UserService(mockUserRepository, mockJWTService);
//     });

//     it('should register a user and return a DTO with a token', async () => {
//         const registerDTO: IRegisterDTO = {
//             name: 'John Doe',
//             email: 'john@example.com',
//             password: 'password123',
//             roles: ['user']
//         };

//         const user = {
//             userId: '123',
//             name: 'John Doe',
//             email: 'john@example.com',
//             roles: ['user'],
//             photo: 'photo.jpg'
//         };

//         const token = 'fake-jwt-token';

//         mockUserRepository.findUserByEmail.mockResolvedValue(null);
//         mockUserService.createNewUser.mockResolvedValue(user);
//         mockJWTService.sign.mockReturnValue(token);
//         mockUserMapper.toUserRegisterResponseDTO.mockReturnValue({
//             userId: user.userId,
//             name: user.name,
//             email: user.email,
//             roles: user.roles,
//             photo: user.photo,
//             token: token
//         });

//         const result: IUserRegisterResponseDTO = await userService.register(registerDTO);

//         expect(result).toEqual({
//             userId: '123',
//             name: 'John Doe',
//             email: 'john@example.com',
//             roles: ['user'],
//             photo: 'photo.jpg',
//             token: 'fake-jwt-token'
//         });
//         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith('john@example.com');
//         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledTimes(1);
//         expect(mockJWTService.sign).toHaveBeenCalledWith('123');
//         expect(mockUserMapper.toUserRegisterResponseDTO).toHaveBeenCalledWith(user, token);
//     });

//     it('should throw an error if the email already exists', async () => {
//         const registerDTO: IRegisterDTO = {
//             name: 'John Doe',
//             email: 'john@example.com',
//             password: 'password123',
//             roles: ['user']
//         };

//         mockUserRepository.findUserByEmail.mockResolvedValue({}); // Simulate existing user

//         await expect(userService.register(registerDTO))
//             .rejects
//             .toThrowError(new Error('This Email already used'));
//     });
// });
