using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepository : GeralRepository, IAtividadeRepository
    {
        private readonly DataContext _context;
        public AtividadeRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(x => x.Id == id);

            var atividade = await query.FirstOrDefaultAsync();

            if(atividade == null) return null;

            return atividade;
        }

        public async Task<Atividade> PegaPorTituloAsync(string titulo)
        {
             IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(x => x.Titulo == titulo);

            var atividade = await query.FirstOrDefaultAsync();

            if(atividade == null) return null;

            return atividade;
        }

        public async Task<Atividade[]> PegaTodasAsync()
        {
             IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            var atividades = await query.ToArrayAsync();

            if(atividades == null) return null;

            return atividades;
        }
    }
}