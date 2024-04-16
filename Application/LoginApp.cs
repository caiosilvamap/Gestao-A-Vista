using System.DirectoryServices.AccountManagement;
using Application.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.DirectoryServices;


namespace Application
{
    public class LoginApp : ILoginApp
    {
        readonly string secretKey = "hv3OIlQkVo9FRqP9bAiGILCULCSoGTEE";
        readonly PrincipalContext context = new(ContextType.Domain, "MASTER:389", "DC=corp,DC=csn,DC=com,DC=br");

        private readonly IUserApp _userApp;

        public LoginApp(IUserApp userApp)
        {
            _userApp = userApp;
        }

        public bool IsValidLogin(string userName, string password)
        {
            using var context = new PrincipalContext(ContextType.Domain, "MASTER:389", "DC=corp,DC=csn,DC=com,DC=br");

            if (context.ValidateCredentials(userName, password) || _userApp.ValidateLoginDb(userName.ToUpper(), password))
            {
                return true;
            }
            return false;
        }

        public string GenerateToken(string username)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public bool ValidateToken(string token)
        {
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false, // Set to true if you want to validate the issuer
                ValidateAudience = false, // Set to true if you want to validate the audience
                ValidateLifetime = true, // Set to false if you don't want to validate the token's expiration
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken securityToken);

                var expirationTime = securityToken.ValidTo;

                if (expirationTime.CompareTo(DateTime.UtcNow) < 0)
                {
                    return false;
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public string GetUserAdName(string username)
        {
            var user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, username);
            string displayName = user.DisplayName;

            return displayName;
        }

        public byte[] GetUserAdProfilePicture(string username)
        {
             var user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, username);

            if (user != null)
            {
                if (user.GetUnderlyingObject() is DirectoryEntry de && de.Properties["thumbnailPhoto"]?.Value is byte[] photoBytes)
                {
                    return photoBytes;
                }
            }

            return Array.Empty<byte>();
        }

        public string GetUserAdProprietyByNameOfPropriety(string propriety, string username)
        {
           var user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, username);

            if (user != null)
            {
                if (user.GetUnderlyingObject() is DirectoryEntry de && de.Properties[propriety]?.Value is string name)
                {
                    return name;
                } 
            }

            return "";
        }
    }
}