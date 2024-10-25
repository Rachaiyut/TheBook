import IGenre from "@domain/interfaces/entities/IGenre";

class Genre implements IGenre {

    genreId: number;
    name: string

    constructor(
        genreId: number,
        name: string
    ) {
        this.genreId = genreId;
        this.name = name
    }


    public getName() {
        return this.name
    }

}

export default Genre;