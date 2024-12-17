using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;


namespace ProAtividade.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtividadeController : ControllerBase
{
    private readonly IAtividadeService _atividadeService;
    
    public AtividadeController(IAtividadeService atividadeService)
    {
        _atividadeService = atividadeService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
       try
       {
            var atividades = await _atividadeService.PegarTodasAtividadesAsync();
            return Ok(atividades);
            
       }catch(Exception ex)
       {
           return BadRequest(ex.Message);
       }
    }   

    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
       try
       {
            var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
            return Ok(atividade);

       }catch(Exception ex)
       {
           return BadRequest(ex.Message);
       }
    }   

    [HttpPost]
    public async Task<IActionResult> Post(Atividade atividade)
    {
        try
        {
            var atividadeSalva = await _atividadeService.AdicionarAtividade(atividade); 
            return Ok(atividadeSalva);

        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Atividade atividade)
    {
        try
        {
            if(id != atividade.Id)
            {
                return Conflict("Id da requisição diferente do Id da atividade");
            }

            var atividadeAtualizada = await _atividadeService.AtualizarAtividade(atividade);
            return Ok(atividadeAtualizada);

        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
            if(atividade == null)
            {
                return NotFound();
            }

            if(await _atividadeService.DeletarAtividade(id))
            {
                return Ok(new { message = "Atividade deletada" });
            }else
            {
                return BadRequest("Ocorreu um problema ao deletar a atividade");
            } 

        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
