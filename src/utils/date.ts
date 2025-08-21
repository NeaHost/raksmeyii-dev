export class DateUtil {
    // Format a date object to MM/DD/YYYY
    static fmMDY(date: Date): string {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  
    // Parse a date string in the format MM/DD/YYYY to a Date object
    static parse(dateString: string): Date {
      const [month, day, year] = dateString.split('/').map((part) => parseInt(part, 10));
      return new Date(year, month - 1, day);
    }
  
    // Convert a date string to a more readable format (example: "Jan 01, 2022")
    static convertDate(dateString: string): string {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    // Parse a date string like "MM/DD/YYYY" and return a Date object
    static parseISO(dateString: string): Date {
      const parts = dateString.split('-');
      return new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
    }
  
    // Get the current date in MM/DD/YYYY format
    static getCurrentDate(): string {
      return DateUtil.fmMDY(new Date());
    }
  }
  