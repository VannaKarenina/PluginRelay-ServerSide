import { Module } from '@nestjs/common';
import { MoleculerProvider } from '@mmh/gateway/providers';

@Module({
  providers: [MoleculerProvider],
  exports: [MoleculerProvider],
})
export class SharedMoleculerModule {}
