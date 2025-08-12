declare module 'compression' {
  import { Request, Response } from 'express';
  interface CompressionOptions {
    level?: number;
    threshold?: number | string;
    filter?: (req: Request, res: Response) => boolean;
  }
  function compression(options?: CompressionOptions): any;
  namespace compression {
    function filter(req: Request, res: Response): boolean;
  }
  export = compression;
}