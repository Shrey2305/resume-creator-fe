using ResumeCreatorAPI.Model;

namespace ResumeCreatorAPI.Interface
{
    public interface ILogin
    {
        Task<Registration?> GetUser(Login login);
        Task<Registration?> AddUser(string name, string username, string email, string password);
    }
}
