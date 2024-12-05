import { Button } from "../ui/button";
import { RemoveAnuncio } from "./removeAnuncio";


export function AnuncioButtonDelete({anuncioId}: {anuncioId: number}) {

   


    return (

    <form action={RemoveAnuncio}>
        <input type="hidden" name="id_anuncio" value={anuncioId} />
    <Button variant="destructive">
        borrar
    </Button>


    </form>

    )
}