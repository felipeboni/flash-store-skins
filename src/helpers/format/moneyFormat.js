import { formatToBRL } from 'brazilian-values';

const CentsToReais = (value) => {
    return (formatToBRL((parseInt(value) / 100).toFixed(2)));
}

const ReaisToCents = (value) => {
    return parseInt(value.toString().replace(/\D/g, '')) * 100;
}

export { CentsToReais, ReaisToCents }