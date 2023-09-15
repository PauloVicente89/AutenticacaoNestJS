import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

const MAX_UPLOAD_FILE_SIZE = 100 * 1024 * 1024;

type Props = {
  fileSize?: number;
  fileExtensionAllowed?: RegExp;
};
export default function FileUploadInterceptor(
  options: Props = {
    fileSize: MAX_UPLOAD_FILE_SIZE,
  },
) {
  return FileInterceptor('file', {
    limits: {
      fileSize: options.fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (
        !file.originalname.match(
          options.fileExtensionAllowed || /\.(jpg|jpeg|png|pdf)$/,
        )
      ) {
        return cb(
          new BadRequestException(
            'Somente arquivo do tipo: jpg, jpeg, png e pdf são permitidos!',
          ),
          false,
        );
      }
      cb(null, true);
    },
  });
}
