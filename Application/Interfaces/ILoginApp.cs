using Application.ViewModels;

namespace Application.Interfaces
{
    public interface ILoginApp
    {
        bool IsValidLogin(string userName, string password);
        string GenerateToken(string username);
        bool ValidateToken(string token);
        string GetUserAdName(string username);
        byte[] GetUserAdProfilePicture(string username);
        string GetUserAdProprietyByNameOfPropriety(string propriety, string username);
    }
}