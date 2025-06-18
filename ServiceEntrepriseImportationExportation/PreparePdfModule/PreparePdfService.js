import ExportationController        from '../ExportationModule/ExportationController.js'
import ComposantExporteController   from '../ComposantExporteModule/ComposantExporteController.js'
import puppeteer                    from 'puppeteer';
import { generateStructureFacture } from './genereteStructure.js'


class PrepareFactureService {
    constructor()
    {
        this.Exportation       = new ExportationController();
        this.ComposantsExporte = new ComposantExporteController();
    }
  async PrepareFactureExportation(req , res) {
  
     const client            =  await this.Exportation.getExportationById(req , res);
     const ComposnatsExporte = await this.ComposantsExporte.getComposantsExporteForFacture(req , res);7

          // return res.status(200).json({client , ComposnatsExporte });


     // genrate facture structure exportation
     const structure = generateStructureFacture({ client, ComposnatsExporte });

     const browser  = await puppeteer.launch();
     const page     = await browser.newPage();

         await page.setContent(structure, { waitUntil: 'networkidle0' });

     const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '40px', bottom: '40px', left: '30px', right: '30px' },
       });

    await browser.close();

   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition', `attachment; filename=exportation_${client.id_exportation}.pdf`);
   res.send(pdfBuffer);
    //  return res.status(200).json({client , ComposnatsExporte });
  }
}

export default PrepareFactureService ;
