/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.addTemplates("default",{
     imagesPath:CKEDITOR.getUrl(CKEDITOR.plugins.getPath("templates")+"templates/images/"),
     templates:[{
         title:'Example 1',
         image:'template1.gif',
         description:'',
         html:'<div class="globalContBox"><div class="ParagraphArticle">'+
             '<h6 class="redTitle">Lactose intolerance is the inability to digest lactose, a sugar found in milk and dairy products. </h6>'+
             '<p class="left_20">While most people begin life digesting lactose just fine, about 75 percent of the world’s population goes on to lose this ability during maturation and adulthood. Although there is no cure for lactose intolerance, it can be effectively managed by minimizing lactose in the diet to a tolerable level. </p>'+
             '<div class="subTitle"><h6>TITLE</h6></div>'+
             '<p>Symptoms of lactose intolerance can occur 30 minutes to 2 hours after consuming lactose. The severity of the symptoms depends on how much lactose was ingested and how much lactose a person can handle. Common symptoms of lactose intolerance include:</p>'+
             '<ul class="ParagraphArticle_Global_UL">'+
             '<li>Abdominal pain</li>'+
             '<li>Bloating</li>'+
             '<li>Flatulence</li>'+
             '<li>Diarrhea</li>'+
             '<li>Nausea</li></ul></div></div>'
     },{
         title:'Example 2',
         image:'template2.gif',
         description:'',
         html:'<div class="globalContBox"><div class="ParagraphArticle">'+
             '<div class="subTitle"><h6>TITLE</h6></div>'+
             '<p>Symptoms of lactose intolerance can occur 30 minutes to 2 hours after consuming lactose. The severity of the symptoms depends on how much lactose was ingested and how much lactose a person can handle. Common symptoms of lactose intolerance include:</p>'+
             '<ul class="ParagraphArticle_Global_ULCir"><li><p><b>Age</b></p>'+
             '<p>Most babies and infants produce ample amounts of lactase. After 2 to 12 years of age, at least two distinct groups of people start to emerge: those who continue to produce lactase actively, and those who do not, resulting in lactose intolerance. Even in those who</p></li>'+
             '<li><p><b>Genetics</b></p>'+
             '<p>In addition to the genetics of the common form of lactose intolerance due to inadequate lactase production, a complete deficiency of lactase can be inherited from your parents. This disorder is autosomal recessive, which means that both parents must pass on a mutated form of the lactase encoding gene. Infants with congenital lactose intolerance are unable to tolerate lactose found in breast milk. Therefore, these babies must be fed lactose-free infant formulas.</p></li>'+
             '<li><p><b>Illness or injury</b></p>'+
             '<p>Illness, surgery or injury to the small intestine can result in the decreased production of lactase. Furthermore, gastrointestinal diseases such as celiac disease, gastroenteritis and Crohn is disease can cause a short-term lactose deficiency and symptoms of lactose intolerance. Resolution or treatment of these underlying disorders may restore lactase levels.</p></li>'+
             '</ul></div></div>'
     }]
});