import { Button } from "../ui/button";

export function AnuncioButtonDelete() {

    async function RemoveAnuncio(formData: FormData){
        'use server'
       const anuncioId = formData.get("id_anuncio")?.toString()
       console.log(anuncioId)    

    }


    return (

    <form action={RemoveAnuncio}>
        <input type="hidden" name="id_anuncio" value="id_anuncio" />
    <Button variant="destructive">
        borrar
    </Button>


    </form>

    )
}