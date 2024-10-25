import { Genre } from "@domain/entites/index";
import { IGenreDTO } from "@application/dtos";
import { GenreModel } from "@infrastructure/models";

export class GenreMapper {
    public static toDto(genre: Partial<Genre>): IGenreDTO {
        return {
            genreId: genre.genreId!,
            name: genre.name!,
        };
    }


    // Convert DTO to Domain Entitys
    public static toEntity(dto: Partial<IGenreDTO>): Genre {
        return new Genre(
            dto.genreId!,
            dto.name!,
        );
    }


    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(genreModel: GenreModel): Genre {

        return new Genre(
            genreModel.dataValues.genreId,
            genreModel.dataValues.name,
        );

    }


    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(genre: Genre): GenreModel {
        return GenreModel.build({
            genreId: genre.genreId,
            name: genre.name,
        });
    }
}
