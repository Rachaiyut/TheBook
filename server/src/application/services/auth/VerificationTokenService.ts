import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";


//DTO
import { IVerificationTokenDTO } from "@application/dtos";

//Entites
import VerificationToken from "@domain/entites/VerificationToken";

//Repository
import { VerificationTokenRepository } from "@infrastructure/repositories/index";

// Mapper
import VerificationTokenMapper from "@application/mappers/VerificationTokenMapper";

//Error Handling 
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class VerificationTokenService {


    private readonly _verificationTokenRepository: VerificationTokenRepository;


    constructor(
        @inject(TYPES.VerificationTokenRepository) verificationTokenRepository: VerificationTokenRepository,
    ) {
        this._verificationTokenRepository = verificationTokenRepository;
    }


    public async createNewVerificationToken(verificationTokenDTO: IVerificationTokenDTO) {

        const newVerificationTokenEntity = VerificationToken.create(
            verificationTokenDTO.token,
            verificationTokenDTO.encrypted,
            verificationTokenDTO.iv
        )

        newVerificationTokenEntity.setUserId(verificationTokenDTO.userId);

        const verificationToken = await this._verificationTokenRepository.createVerificationToken(newVerificationTokenEntity)

        return VerificationTokenMapper.toDto(verificationToken)
    }


    public async getVerificationToken(encrypted: string, token: string) {
        const verificationTokenEntity = await this._verificationTokenRepository.getVerificationToken(encrypted, token);

        return VerificationTokenMapper.toDto(verificationTokenEntity)
    }


}


export default VerificationTokenService;