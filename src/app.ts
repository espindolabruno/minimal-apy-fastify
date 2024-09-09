import fastify from "fastify";
import cors from "@fastify/cors"

const app = fastify({logger: true })

app.register(cors, {
    origin: "*"
})

const teams = [
    {id:1, name:'Lewis Hamilton', nationality:'British', birthDate:'1985-06-27'},
    {id:2, name:'Charles Leclerc', nationality:'French', birthDate:'1985-03-27'},
    {id:3, name:'Max Verstappen', nationality:'Dutch', birthDate:'1987-03-27'}
    ]

app.listen({ port: 3333 }, ()=> {
    console.log(`Server is now listening`)
  })


app.get("/", async (req, res) => {
    console.log("Dude this is a get request")
})

app.get('/teams', async (req, res) => {
  console.log(teams)
  res.code(200).send(teams)
})


interface driversParams {
  id:string
}

app.get<{Params:driversParams}>('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const team = teams.find(t => t.id === id)
  
  if(!team)
    return res.status(404).send({error: 'Team not found'})
  
  return res.status(200).send(team)

})