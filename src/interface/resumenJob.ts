import ResumenLib from '../lib/ResumentLib'


export const genResumen = async (ruc:string) => {
    const billInvoices = await ResumenLib.findAll(ruc);
 
  };


