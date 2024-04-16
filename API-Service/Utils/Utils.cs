using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System.Text.Json;

namespace API_Service
{

    public class Utils
    {
        public string ListToJson<T>(List<T> items)
        {
            var response = new List<Dictionary<string, object>>();

            // Loop through each item in the list
            foreach (T item in items)
            {
                var elements = new List<Dictionary<string, object>>();

                // Get all the properties of the item
                PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in props)
                {
                    // Get the display name of the property
                    var displayName = prop.GetCustomAttributes(typeof(DisplayNameAttribute), true)
                        .OfType<DisplayNameAttribute>()
                        .FirstOrDefault()?.DisplayName;

                    // Use the display name if available, otherwise use the property name
                    var columnName = string.IsNullOrWhiteSpace(displayName) ? prop.Name : displayName;

                    // Get the value of the property for the current item
                    var value = prop.GetValue(item);

                    // Convert value to string representation (handle null values)
                    var valueString = value?.ToString()?.Replace(',', '.');

                    // Create the element dictionary for the property
                    var element = new Dictionary<string, object>
                    {
                        { "column", columnName },
                        { "value", valueString }
                    };

                    elements.Add(element);
                }

                // Create the entry dictionary for the item
                var entry = new Dictionary<string, object>
                {
                    { "elements", elements }
                };

                response.Add(entry);
            }

            return JsonSerializer.Serialize(response);
        }


    }

}

