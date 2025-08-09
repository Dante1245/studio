
import Image from 'next/image';

interface NotificationToastProps {
  country: string;
  crypto: string;
  amount: string;
  name: string;
}

function getCountryFlagEmoji(country: string) {
    const countryCode = {
        'USA': 'US',
        'Switzerland': 'CH',
        'UAE': 'AE',
        'Norway': 'NO',
        'Germany': 'DE',
        'Japan': 'JP',
        'Canada': 'CA',
        'Australia': 'AU',
        'Brazil': 'BR',
        'India': 'IN',
    }[country] || 'US';

    if (typeof String.fromCodePoint !== 'function') return '🏳️';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export function NotificationToast({ country, crypto, amount, name }: NotificationToastProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-2xl">{getCountryFlagEmoji(country)}</div>
      <div>
        <p className="font-medium text-foreground">New Purchase</p>
        <p className="text-sm text-muted-foreground">
          {name} from {country} just bought {amount} {crypto}.
        </p>
      </div>
    </div>
  );
}
