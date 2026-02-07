import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator"
import { EventStatus } from "../entity/events.entity"


export class EventDto {
    @IsString()
    @MaxLength(20)
    title: string
    
    @IsString()
    @IsOptional()
    description: string
    
    @IsDateString()
    startDate: string
    
    @IsDateString()
    endDate: string

    @IsString()
    @MaxLength(100)
    place: string
    
    @IsNumber()
    @Min(1)
    capacity: number
    
    @IsEnum(EventStatus)
    @IsOptional()
    status: EventStatus
}