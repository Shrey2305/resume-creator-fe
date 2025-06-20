using Resume_Creator.Models;

namespace Resume_Creator.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> RegisterUserAsync(Register user);

        Task<Register?> ValidateUserAsync(Login login);
    }
}
