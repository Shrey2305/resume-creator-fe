using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Win32;
using ResumeCreatorAPI.Interface;
using ResumeCreatorAPI.Model;
using System.Text.Json;

namespace ResumeCreatorAPI.Repos
{
    public class LoginService : ILogin
    {
        private readonly string _filePath = "data.json";

        //public async Task<Login?> GetUser(string username, string password)
        //{
        //    if (!File.Exists(_filePath))
        //        return null;

        //    var json = await File.ReadAllTextAsync(_filePath);
        //    var users = JsonSerializer.Deserialize<List<Login>>(json) ?? new List<Login>();

        //    return users.FirstOrDefault(u =>
        //        u.Username.Equals(username, StringComparison.OrdinalIgnoreCase) &&
        //        u.Password == password);
        //}

        public async Task<Registration?> GetUser(Login login)
        {
            var users = await ReadUsersFromFileAsync();

            var user = users.FirstOrDefault(u =>
                u.UserName == login.Username && u.Password == login.Password
            );

            return user;
        }
        private async Task<List<Registration>> ReadUsersFromFileAsync()
        {
            if (!File.Exists(_filePath))
                return new List<Registration>();

            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Registration>>(json) ?? new List<Registration>();
        }




        public async Task<Registration?> AddUser(string name, string username, string email, string password)
        {
            List<Registration> users = new();

            if (File.Exists(_filePath))
            {
                var json = await File.ReadAllTextAsync(_filePath);
                users = JsonSerializer.Deserialize<List<Registration>>(json) ?? new List<Registration>();
            }

            var exists = users.Any(u =>
                u.UserName.Equals(username, StringComparison.OrdinalIgnoreCase) ||
                u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

            if (exists)
                return null;

            var newUser = new Registration
            {
                Name = name,
                UserName = username,
                Email = email,
                Password = password
            };

            users.Add(newUser);

            var updatedJson = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, updatedJson);

            return newUser;
        }
    }

}
