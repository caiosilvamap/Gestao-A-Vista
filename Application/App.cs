using AutoMapper;
using Application.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class App<TViewModel, TModel> : IApp<TViewModel, TModel>
       where TViewModel : class
       where TModel : class
    {
        private readonly IMapper _mapper;
        private readonly IRepository<TModel> _repository;

        public bool success { get; set; }

        public App(IMapper mapper, IRepository<TModel> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public virtual async Task<TViewModel> CreateAsync(TViewModel viewModel)
        {
            try
            {
                var model = _mapper.Map<TModel>(viewModel);
                await _repository.CreateAsync(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao adicionar", ex);
            }
        }

        public virtual async Task<TViewModel> EditAsync(TViewModel viewModel)
        {
            try
            {
                var model = _mapper.Map<TModel>(viewModel);
                await _repository.EditAsync(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao editar", ex);
            }
        }

        public virtual async Task<TViewModel> FindIdNoTrackingAsync(int id)
        {
            try
            {
                var model = await _repository.FindIdNoTrackingAsync(id);
                var viewModel = _mapper.Map<TViewModel>(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return default;
        }


        public async Task<IEnumerable<TViewModel>> FindAllAsyncNoTracking()
        {
            try
            {
                var model = await _repository.FindAllAsyncNoTracking();
                var viewModel = _mapper.Map<IEnumerable<TViewModel>>(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return new List<TViewModel>();
        }

        public async Task<IEnumerable<TViewModel>> FindAllAsync()
        {
            try
            {
                var model = await _repository.FindAllAsync();
                var viewModel = _mapper.Map<IEnumerable<TViewModel>>(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return new List<TViewModel>();
        }

        public virtual async Task<IEnumerable<TViewModel>> WhereAsync(Expression<Func<TModel, bool>> predicate)
        {
            try
            {
                IEnumerable<TModel> model = await _repository.WhereAsync(predicate);
                var viewModel = _mapper.Map<IEnumerable<TViewModel>>(model);
                return viewModel;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return new List<TViewModel>();
        }

        public async Task<TViewModel> DeleteAsync(TViewModel viewModel)
        {
            try
            {
                var model = _mapper.Map<TModel>(viewModel);

                await _repository.DeleteAsync(model);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao excluir", ex);
            }
        }
    }

    public class App<TModel> : IApp<TModel> where TModel : class
    {
        private readonly IMapper _mapper;
        private readonly IRepository<TModel> _repository;

        public App(IMapper mapper, IRepository<TModel> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public virtual async Task<int> DeleteAsync(TModel model)
        {
            return await _repository.DeleteAsync(model);
        }

        public virtual async Task<TModel> EditAsync(TModel viewModel)
        {
            try
            {
                await _repository.EditAsync(viewModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao editar", ex);
            }
        }

        public async Task<IEnumerable<TModel>> FindAllAsync()
        {
            try
            {
                return await _repository.FindAllAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return new List<TModel>();
        }

        public virtual async Task<TModel> FindIdNoTrackingAsync(int id)
        {
            try
            {
                return await _repository.FindIdNoTrackingAsync(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return default;
        }

        public virtual async Task<IEnumerable<TModel>> WhereAsync(Expression<Func<TModel, bool>> predicate)
        {
            try
            {
                return await _repository.WhereAsync(predicate);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro: ", ex);
            }
        }
    }
}
