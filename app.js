const express=require("express")
const app=express()
const port=3000
app.use(express.json())
let ingressos=[
    {id: 1 , filme: "Poderoso Chefão" , preco: 40 , categoria: "Drama"},
    {id: 2 , filme: "Fuga Das Galinhas" , preco: 30 , categoria: "Comédia"},
    {id: 3 , filme: "Tropa De Elite" , preco: 30 , categoria: "Ação"}
]

//mostra todos recursos
app.get('/recurso',(req,res)=>{
    res.json(ingressos)
})

//retorna quantos elementos tem no ingressos
app.get('/recurso/quantidade',(req,res)=>{
    res.json(ingressos.length)
})

//retorna o primeiro elemento cadastrado em recurso
app.get('/recurso/primeiro',(req,res)=>{
    res.json(ingressos[id=0])
})

//dados estatícos dos preços
app.get('/recurso/media',(req,res)=>{
let soma=0
let valor=0
for(x=0;x<ingressos.length;x++){
    soma=ingressos[x].preco
    valor=soma+valor
}
let media=valor/ingressos.length
res.json(media)})

//retorna o último elemento cadastrado em recurso
app.get('/recurso/ultimo',(req,res)=>{
    res.json(ingressos[(ingressos.length-1)])
})

//mostrar recursos filtrados
app.get('/recurso/:preco',(req,res)=>{
    const preco= parseInt(req.params.preco)
    const valor=ingressos.filter(p=>p.preco===preco)
    if(valor){
    res.json(valor)
        }else{
    res.status(400).json({error: 'filme não achado'}) 
        }
})

//buscar
app.get('/recurso/:id',(req,res)=>{
    const id= parseInt(req.params.id)
    const recursos=ingressos.find(p=>p.id===id)
    if(recursos){
    res.json(recursos)
        }else{
    res.status(400).json({error: 'filme não achado'}) 
        }
})

//criar so com pessoais autorizadas
app.post('/recurso/',(req,res)=>{
    const filme = req.body.filme
    const preco = req.body.preco
    const categoria = req.body.categoria
    const novofilme={id:ingressos.length+1, filme, preco, categoria}
    ingressos.push(novofilme)
    res.status(201).json(novofilme)
})

//posta mais de uma coisa
app.post('/recursos', (req, res) => {
  const novosRecursos = req.body; // Espera um array de recursos no corpo da requisição
  
  // Verifica se a requisição é um array
  if (!Array.isArray(novosRecursos)) {
    return res.status(400).json({ mensagem: 'Os dados devem ser um array.' });
  }

  // Adiciona os novos recursos ao array existente
  ingressos = ingressos.concat(novosRecursos);

  return res.status(201).json({ 
    id: ingressos.length+1,
    mensagem: 'Recursos cadastrados com sucesso!',
    recursos: ingressos 
  });
});

//atualizar
app.put('/recurso/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const {filme}=req.body
    const filmes=ingressos.find(p=>p.id===id)
    if(filmes){
        filmes.filme=filme
        res.json(filmes)
    }
    else{
        res.status(404).json({error:'filme não encontrado'})
    }
})

//deletar
app.delete('/recurso/:id', (req,res)=>{
    const id=pae(req.params.id)
    const index=ingressos.findIndex(p=>p.id===id)
    if(index!==-1){
        const deletarfilme=ingressos.splice(index, 1)
        res.json(deletarfilme)
    }
    else{
        res.status(404).json({error:'pessoa n encontrada'})
    }
})

app.listen(port,()=>{
    console.log(`esta pegando na porta:${port}`)
})