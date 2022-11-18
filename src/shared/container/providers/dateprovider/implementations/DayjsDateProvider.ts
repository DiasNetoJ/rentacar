import { IDateProvider } from "../IDateProvider";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
    
    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }
    
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
    compareInDays(start_date: Date, end_date: Date): number {
        return this.compare(start_date, end_date, "days");
    }

    private convertToUTC(date: Date): string {
        return dayjs(date)
        .utc()
        .local()
        .format();
    }
    
    compareInHours(start_date: Date, end_date: Date): number {
        return this.compare(start_date, end_date, "hours");
    }

    private compare(start_date: Date, end_date: Date, unity: QUnitType | OpUnitType): number {
        return dayjs(this.convertToUTC(end_date)).diff(this.convertToUTC(start_date), unity);
    }

}

export { DayjsDateProvider }