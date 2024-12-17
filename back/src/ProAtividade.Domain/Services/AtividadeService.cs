using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepository _atividadeRepository;

        public AtividadeService(IAtividadeRepository atividadeRepository)
        {
           _atividadeRepository = atividadeRepository;   
        }

        public async Task<Atividade> AdicionarAtividade(Atividade atividade)
        {
            if(await _atividadeRepository.PegaPorTituloAsync(atividade.Titulo) != null)
            {
                throw new Exception("Atividade já cadastrada");
            }

            if(await _atividadeRepository.PegaPorIdAsync(atividade.Id) == null)
            {
                _atividadeRepository.Adicionar(atividade);
                if(await _atividadeRepository.SalvarMudancasAsync())
                {
                    return atividade;
                }
            }

            throw new Exception("Erro ao adicionar a atividade");
        }

        public async Task<Atividade> AtualizarAtividade(Atividade atividade)
        {
            if(atividade.DataConclusao != null)
            {
                throw new Exception("Atividade já concluída");
            }

            if(await _atividadeRepository.PegaPorIdAsync(atividade.Id) != null)
            {
                _atividadeRepository.Atualizar(atividade);
                if(await _atividadeRepository.SalvarMudancasAsync())
                {
                    return atividade;
                }
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade atividade)
        {
            if(atividade != null)
            {
                atividade.Concluir();
                _atividadeRepository.Atualizar(atividade);
                return await _atividadeRepository.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int id)
        {
           var atividade = await _atividadeRepository.PegaPorIdAsync(id);

           if(atividade == null)
           {
               throw new Exception("Atividade não encontrada");
           }

            _atividadeRepository.Deletar(atividade);
            return await _atividadeRepository.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int id)
        {
           try
           {
                var atividade = await _atividadeRepository.PegaPorIdAsync(id);
                if(atividade == null) throw new Exception("Atividade não encontrada");

                return atividade;
               
           }
           catch (Exception ex)
           { 
             throw new Exception(ex.Message);
           }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
           {
                var atividades = await _atividadeRepository.PegaTodasAsync();
                if(atividades == null) throw new Exception("Nenhuma atividade encontrada");

                return atividades;
               
           }
           catch (Exception ex)
           { 
             throw new Exception(ex.Message);
           }
        }
    }
}