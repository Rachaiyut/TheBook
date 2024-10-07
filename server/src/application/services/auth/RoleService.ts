import { injectable, inject } from "inversify";

//Repository
import { UserRepository } from "@infrastructure/repositories";
import { TYPES } from "@inversify/types";

//Enum
import UserRole from "@domain/entites/UserRole";

@injectable()
class RoleService {

    private _userRepository: UserRepository;

    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this._userRepository = userRepository;
    }

    public async hasRole(userId: string, role: UserRole): Promise<boolean> {
        const user = await this._userRepository.findUserByPK(userId);

        if (user !== null) {
            return user.hasRole(role);
        }

        return false;
    }

    public async hasPermission(userId: string, permission: string): Promise<boolean> {
        const user = await this._userRepository.findUserByPK(userId);

        if (user !== null) {
            const rolePermissions = this.getPermissionsForRole(user.roles as unknown as UserRole);
            return rolePermissions.includes(permission);
        }

        return false;
    }

    private getPermissionsForRole(role: UserRole): string[] {
        const rolePermissionsMap: { [key in UserRole]: string[] } = {
            [UserRole.Admin]: ['create', 'read', 'update', 'delete'],
            [UserRole.Editor]: ['create', 'read', 'update'],
            [UserRole.User]: ['read']
        };
        return rolePermissionsMap[role];
    }

}

export default RoleService;