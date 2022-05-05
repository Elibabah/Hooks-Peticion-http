import { useFetch } from "./componens/customehooks/useFetch"
import { useState, useEffect } from 'react'

function App() {

    const [data] = useFetch("http://localhost:8000/blogs"); 
    console.log(data)
    const [post, setPost] = useState({})

    //Modelar objeto al cambio inputs
    const handleChange = (e)=> {
        //console.log(e)
        const key = e.target.name 
        //console.log(key)
        setPost({...post, [key]: e.target.value })
        console.log(post)
    }

    //Crear ID y Date al objeto modelado
    const handleSubmit = ()=> {
        console.log(post)
        const id = Math.ceil(Math.random()*1000).toString()
        const date = new Date().toString()
        setPost({...post, id: id, date: date })
        postRequest(post)
    }

    //Petición crear Post
    const postRequest = (post)=> {
        fetch("http://localhost:8000/blogs",
        {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(()=> {
            console.log("post publicado: ", post)
        }).catch((error)=> {
            console.log(error + "has ocurred")
        })
    }

    //Eliminar post
    const handleDelete = (id)=> {
    console.log(id)
    fetch("http://localhost:8000/blogs/" + id,{
        method: "DELETE"
    }).then(()=>{
        console.log("eliminado")
    }).catch((error)=>{
        console.log(error)
    })

}




    return (
            <div>

                <input name="title" type="text" placeholder="Title" onChange={(e)=>handleChange(e)}/>
                <input name="subtitle" type="text" placeholder="subtitle" onChange={(e)=>handleChange(e)}/>
                <input name="content" type="text" placeholder="content" onChange={(e)=>handleChange(e)}/>
                <button onClick={handleSubmit}>Submit</button>

                {data.map((item) => 
                { return(
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <h1>{item.subtitle}</h1>
                        <p>{item.content}</p>
                        <p>{item.date}</p>
                        <button onClick={()=>handleDelete(item.id)}>Eliminar</button>
                        <button>Editar</button>
                    </div>
                )}
                )}
            </div>
    )
}

export default App;