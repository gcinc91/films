import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @ApiProperty()
  GenderType: string;
}

export class GenderDto extends CreateGenderDto {
  @ApiProperty()
  id: number;
}
