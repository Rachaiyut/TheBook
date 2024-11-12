import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Entity
import VerificationToken from "@domain/entites/VerificationToken";

//Model
import { VerificationTokenModel } from "@infrastructure/models/index";

// Mapper
import VerificationTokenMapper from "@application/mappers/VerificationTokenMapper";

// Error
import ErrorFactory from "@domain/exceptions/ErrorFactory";

@injectable()
class VerificationTokenRepository {


    private _verificationTokenModel: typeof VerificationTokenModel;


    constructor(
        @inject(TYPES.VerificationTokenModel) verificationTokenModel: typeof VerificationTokenModel,
    ) {
        this._verificationTokenModel = verificationTokenModel;
    }

    
    public async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
        const verificationTokenModel = VerificationTokenMapper.toPersistenceModel(verificationToken);

        const verificationTokenEntity = await this._verificationTokenModel.create(verificationTokenModel.dataValues);

        return VerificationTokenMapper.toEntityFromModel(verificationTokenEntity)
    }

    public async getVerificationToken(encrypted: string, token: string) {
        const verificationTokenEntity = await this._verificationTokenModel.findOne({
            where: {
                encrypted,
                token
            }
        })

        if (!verificationTokenEntity) {
            throw ErrorFactory.createError("NotFound", "This token is not exist");
        }

        return VerificationTokenMapper.toEntityFromModel(verificationTokenEntity)
    }

}

export default VerificationTokenRepository;