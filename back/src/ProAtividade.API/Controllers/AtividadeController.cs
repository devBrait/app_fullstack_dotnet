using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtividadeController : ControllerBase
{
    private readonly DataContext _context;
    
    public AtividadeController(DataContext context)
    {
            _context = context;
        
    }

    [HttpGet]
    public IEnumerable<Atividade> Get()
    {
        return _context.Atividades;
    }   

    
    [HttpGet("{id}")]
    public Atividade Get(int id)
    {
        var atividade = _context.Atividades.FirstOrDefault(x => x.Id == id);
        if (atividade == null) return new Atividade();
        return atividade;
    }   

    [HttpPost]
    public IEnumerable<Atividade> Post(Atividade atividade)
    {
        _context.Atividades.Add(atividade);

        if(_context.SaveChanges() > 0)
        {
            return _context.Atividades;
        }

        throw new Exception("Não foi possível adicionar a atividade");
    }

    [HttpPut("{id}")]
    public Atividade Put(int id, Atividade atividade)
    {
       if(atividade.Id != id) throw new Exception("Id da atividade não corresponde ao id da requisição");

       _context.Update(atividade);

       if(_context.SaveChanges() > 0)
       {
           return _context.Atividades.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Atividade não encontrada");
       }

        throw new Exception("Não foi possível atualizar a atividade");
    }

    [HttpDelete("{id}")]
    public Boolean Delete(int id)
    {
        _context.Remove(_context.Atividades.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Atividade não encontrada"));

        if(_context.SaveChanges() > 0)
        {
            return true;
        }

        return false;
    }
}
