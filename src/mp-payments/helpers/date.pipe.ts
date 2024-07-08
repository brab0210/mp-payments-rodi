import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.begin_date) {
      const { begin_date, end_date } = this.obtenerFechas();
      value = { begin_date, end_date };
    }

    return value;
  }

  private obtenerFechas() {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;

    const fechaInicio = new Date(Date.UTC(anio, mes - 1, 1));
    const fechaFin = new Date(Date.UTC(anio, mes, 0));
    const fechaFinMod = this.setFecha(fechaFin);
    const zonaHoraria = '-03:00';

    const formatoFechaISO = (fecha: Date) => {
      return fecha.toISOString().replace('Z', `${zonaHoraria}`);
    };

    return {
      begin_date: formatoFechaISO(fechaInicio),
      end_date: formatoFechaISO(fechaFinMod),
    };
  }

  private setFecha(fecha) {
    let milisegundos = fecha.getTime();
    let dia,
      hora,
      minutos,
      segundos = 0;
    let nuevaFecha;
    dia = 24 * 60 * 60 * 1000;
    hora = 23 * 60 * 60 * 1000;
    minutos = 59 * 60 * 1000;
    segundos = 59 * 1000;

    nuevaFecha = new Date(milisegundos + hora + minutos + segundos);
    return nuevaFecha;
  }
}
