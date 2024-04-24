import { Observable } from "@nativescript/core";
import { ReustarantModel } from "~/models";
import { ReustarantService } from "~/services";

export class ReustarantViewModel extends Observable {
  private _reustarant: ReustarantModel;

  constructor(private _context: { reustarantId: number }) {
    super();
    this._reustarant = ReustarantService.receiveReustarants().getReustarantById(
      this._context.reustarantId
    );
  }

  get reustarant(): ReustarantModel {
    return this._reustarant;
  }
}
