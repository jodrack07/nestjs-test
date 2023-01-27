import { Injectable, PipeTransform, ArgumentMetadata, Logger } from '@nestjs/common'

@Injectable()
export class FreezePipe implements PipeTransform {
    private logger = new Logger(FreezePipe.name)
    transform(value: number, meta: ArgumentMetadata) {
        this.logger.log("Freeze pipe running...")
        /* 
            freeze method makes our object completly immutable.
            It prevents the modification of the existing values and the addition
            of extra properties.
        */
        Object.freeze(value)
        return value
    }
}
