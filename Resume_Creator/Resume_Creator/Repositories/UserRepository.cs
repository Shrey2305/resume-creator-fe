using Resume_Creator.Interfaces;
using Resume_Creator.Models;
using System.Text.Json;

namespace Resume_Creator.Repositories;

public class UserRepository : IUserRepository
{

    private readonly string _jsonFile = Path.Combine("Data", "users.json");
    public async Task<bool> RegisterUserAsync(Register user)
    {
        var users = await ReadUsersFromFileAsync();

        bool userExists = users.Any(u =>
        u.Username == user.Username && u.Password == user.Password
    );

        if (userExists)
            return false; 

        users.Add(user);
        await WriteUsersToFileAsync(users);
        return true;
    }

    public async Task<Register?> ValidateUserAsync(Login login)
    {
        var users = await ReadUsersFromFileAsync();

        var user = users.FirstOrDefault(u =>
            u.Username == login.Username && u.Password == login.Password
        );

        return user;
    }


    private async Task<List<Register>> ReadUsersFromFileAsync()
    {
        if (!File.Exists(_jsonFile))
            return new List<Register>();

        var json = await File.ReadAllTextAsync(_jsonFile);
        return JsonSerializer.Deserialize<List<Register>>(json) ?? new List<Register>();
    }

    private async Task WriteUsersToFileAsync(List<Register> users)
    {
        var json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(_jsonFile, json);
    }
}
