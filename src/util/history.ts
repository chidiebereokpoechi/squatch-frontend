import {
  Action,
  createBrowserHistory,
  Location,
  LocationState,
  Path,
} from 'history'

export const history = createBrowserHistory()

class PathLocationManager {
  private pastLocations: Location[] = []
  private readonly key = 'appLocationHistory'

  constructor() {
    this.pastLocations = []
  }

  public push(location: Location) {
    this.pastLocations.push(location)
  }

  public pop() {
    this.pastLocations.pop()
  }

  public length() {
    return this.pastLocations.length
  }

  public setLocation(index: number, location: Location) {
    this.pastLocations[index] = location
  }

  public getLocation(index: number) {
    return this.pastLocations[index]
  }

  public setLocations(locations: Location[]) {
    this.pastLocations = locations
  }

  private dumpToSessionStorage() {
    sessionStorage.setItem(this.key, JSON.stringify(this.pastLocations))
  }
}

const pastLocations = new PathLocationManager()

function updatePastLocations(location: Location, action: Action) {
  switch (action) {
    case 'PUSH':
      // first location when app loads and when pushing onto history
      pastLocations.push(location)
      break
    case 'REPLACE':
      // only when using history.replace
      pastLocations.setLocation(pastLocations.length() - 1, location)
      break
    case 'POP': {
      // happens when using the back button, or forward button
      pastLocations.pop()
      // location according to pastLocations
      const appLocation = pastLocations.getLocation(pastLocations.length() - 1)
      if (!(appLocation && appLocation.key === location.key)) {
        // If the current location doesn't match what the app thinks is the current location,
        // blow up the app history.
        pastLocations.setLocations([location])
      }
      break
    }
    default:
  }
}

history.listen(updatePastLocations)

export function isPreviousLocationWithinApp(): boolean {
  return pastLocations.length() > 1
}

export function goBackOrPush(location: Path, state?: LocationState): void {
  if (isPreviousLocationWithinApp()) {
    history.goBack()
  } else {
    history.push(location, state)
  }
}

export function blockNavigation() {
  const unBlock = history.block(
    'Are you sure you want to leave this page? You have unsaved changes'
  )
  return { unBlock }
}
