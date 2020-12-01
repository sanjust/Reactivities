using System;
using Domain;

namespace Application.Interfaces
{
    public interface IJwrGenerator
    {
        string CreateToken(AppUser user);
    }
}
