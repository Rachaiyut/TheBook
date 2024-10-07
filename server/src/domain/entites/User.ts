//Interface
import { IUser } from "@domain/interfaces/entities/index";

//Enum
import UserRole from "./UserRole";

class User implements IUser {
	userId: string;
	name: string;
	email: string;
	password: string;
	passwordChangeAt?: Date;
	roles: ("user" | "admin")[];
	photo?: string;

	constructor(
		userId: string,
		name: string,
		email: string,
		password: string,
		passwordChangeAt?: Date,
		roles?: ("user" | "admin")[],
		photo?: string,
	) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.passwordChangeAt = passwordChangeAt;
		this.roles = roles!
		this.photo = photo;
	}


	hasRole(role: UserRole): boolean {
		return this.roles.includes(role as "user" | "admin");
	}

	// // Method to check if the password has been changed since a given date
	// isPasswordChangedAfter(timestamp: Date): boolean {
	// 	if (!this.passwordChangeAt) {
	// 		return false;
	// 	}
	// 	return this.passwordChangeAt.getTime() > timestamp.getTime();
	// }

	// // Method to update user roles
	// updateRoles(newRoles: UserRole[]): void {
	// 	this.roles = newRoles;
	// }

	// // Method to update the user's password and set the password change date
	// updatePassword(newPassword: string, passwordChangeAt: Date = new Date()): void {
	// 	this.password = newPassword;
	// 	this.passwordChangeAt = passwordChangeAt;
	// }

	// // Optional method to update the user's profile photo
	// updatePhoto(newPhoto: string): void {
	// 	this.photo = newPhoto;
	// }
}

export default User;
