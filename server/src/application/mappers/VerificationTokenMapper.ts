// DTO
import { IVerificationTokenDTO } from "@application/dtos";

// Entity
import VerificationToken from "@domain/entites/VerificationToken";

// Model
import { VerificationTokenModel } from "@infrastructure/models";

class VerificationTokenMapper {

    // Convert Domain Entity to DTO
    public static toDto(verificationToken: VerificationToken): Omit<IVerificationTokenDTO, "tokenId"> {

        return {
            userId: verificationToken.getUserId()!,
            token: verificationToken.token,
            encrypted: verificationToken.encrypted,
            iv: verificationToken.iv
        };
    }

    // Convert DTO to Domain Entity
    // public static toEntity(dto: IVerificationTokenDTO): VerificationToken {
    //     return VerificationToken.create(
    //         dto.isbn,
    //         dto.orderId,
    //         dto.quantity,
    //         dto.price,
    //     );
    // }

    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(verificationTokenModel: VerificationTokenModel): VerificationToken {
        const VerificationTokenEntity = VerificationToken.create(
            verificationTokenModel.dataValues.token,
            verificationTokenModel.dataValues.encrypted,
            verificationTokenModel.dataValues.iv
        );

        VerificationTokenEntity.setTokenId(verificationTokenModel.dataValues.tokenId!);
        VerificationTokenEntity.setUserId(verificationTokenModel.dataValues.userId);

        return VerificationTokenEntity;
    }

    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(verificationToken: VerificationToken): VerificationTokenModel {
        return VerificationTokenModel.build({
            userId: verificationToken.getUserId()!,
            token: verificationToken.token,
            encrypted: verificationToken.encrypted,
            iv: verificationToken.iv
        });
    }
}

export default VerificationTokenMapper;
