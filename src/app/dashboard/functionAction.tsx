
import { UpdateAnuncio } from "./update-anuncio"
import { CrearAnuncio } from "./create-anuncio"


export default function functionAction(event: unknown, anuncio: { id_anuncio: number; titulo: string; descripcion: string; importancia: string; createdAt: Date; updatedAt: Date; }) {

    const functionAction = anuncio.id_anuncio ? UpdateAnuncio : CrearAnuncio; 

    console.log(functionAction)
}