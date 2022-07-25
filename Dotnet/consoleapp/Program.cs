using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Globalization;
using System;
using Humanizer;


    
//  PAQUETE NUGET
//dotnet add package Humanizer.Core.es --version 2.14.1

// Get all custom cultures.
System.Console.WriteLine("\n\n Culturas\n");
CultureInfo[] custom = CultureInfo.GetCultures(CultureTypes.NeutralCultures);
if (custom.Length == 0) {
    Console.WriteLine("There are no user-defined custom cultures.");
}
else {
    Console.WriteLine("Custom cultures:");
    //foreach (var culture in custom)
    // Console.WriteLine("   {0} -- {1}", culture.Name, culture.DisplayName);
}
Console.WriteLine();


CultureInfo ci = new CultureInfo("es-MX");
var text1 = DateHumanizeExtensions.Humanize(DateTime.Now,DateTime.UtcNow, ci); 
var text2 = DateTime.Now.AddMinutes(154).Humanize(culture: ci);
var text3 = DateTime.Now.AddMinutes(-468).Humanize(culture: ci);
var text4 = DateTime.Now.AddMinutes(9848646).Humanize(culture: ci);
Console.WriteLine("Using Date");
System.Console.WriteLine(DateTime.Now);
System.Console.WriteLine(text1);
System.Console.WriteLine(text2);
System.Console.WriteLine(text3);
System.Console.WriteLine(text4);


//TimeSpans
TimeSpan.FromMilliseconds(65516165).Humanize(precision:3, culture:ci);
var text5 = TimeSpan.FromMilliseconds(1299630020).Humanize(maxUnit: Humanizer.Localisation.TimeUnit.Week, 
                                                            minUnit: Humanizer.Localisation.TimeUnit.Second, 
                                                            precision: 1 , 
                                                            culture:ci);
var text6 = TimeSpan.FromMilliseconds(655544).Humanize(maxUnit: Humanizer.Localisation.TimeUnit.Week, 
                                                            minUnit: Humanizer.Localisation.TimeUnit.Second, 
                                                            precision: 1 , 
                                                            culture:ci);
var text7 = TimeSpan.FromMilliseconds(6550).Humanize(maxUnit: Humanizer.Localisation.TimeUnit.Week, 
                                                            minUnit: Humanizer.Localisation.TimeUnit.Second, 
                                                            precision: 1 , 
                                                            culture:ci);
DateTime dbDateSample = DateTime.Now.AddMinutes(25);
var text8 = "server hour Case: " + TimeSpan.FromSeconds((dbDateSample - DateTime.Now).TotalSeconds).Humanize(maxUnit: Humanizer.Localisation.TimeUnit.Week, 
                                                            minUnit: Humanizer.Localisation.TimeUnit.Second, 
                                                            precision: 1 , 
                                                            culture:ci);

System.Console.WriteLine("Using TimeSpan");
System.Console.WriteLine(text5);
System.Console.WriteLine(text6);
System.Console.WriteLine(text7);
System.Console.WriteLine(text8);


System.Console.WriteLine("Plural - singular");
Console.WriteLine( "like".ToQuantity(0) );
Console.WriteLine( "like".ToQuantity(3) );
Console.WriteLine( "like".ToQuantity(1) );
Console.WriteLine( "like".ToQuantity(-1) );
Console.WriteLine( "like".ToQuantity(-14) );

Humanizer.Inflections.Vocabularies.Default.AddIrregular("choripan","choripanes", matchEnding:false);
Console.WriteLine( "choripan".ToQuantity(0) );
Console.WriteLine( "choripan".ToQuantity(3) );
Console.WriteLine( "choripan".ToQuantity(1) );
Console.WriteLine( "choripan".ToQuantity(-1) );
Console.WriteLine( "choripan".ToQuantity(-14) );



Console.WriteLine($"Tengo {22.ToWords(ci)} años");

var culturaActual =  CultureInfo.CurrentCulture;
System.Console.WriteLine(   culturaActual.Name);


