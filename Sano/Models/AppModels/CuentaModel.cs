using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Sano.Models.AppModels
{
    public class CuentaModel 
    {
        [Required]
        [Display(Name = "Usuario")]
        //[RegularExpression(RegexConst.Email, ErrorMessage = "Su usuario no tiene formato correcto.")]
        public string Usuario { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

    }

   
}
