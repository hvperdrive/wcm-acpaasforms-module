# wcm-acpaasforms-module

This module gives you endpoints to post support & feature-request forms for ACPaaS Portal.

## Prerequisites
 - A running implementation of the Pelorus CMS is needed either locally or on a server.
 (see https://github.com/hvperdrive/pelorus-cms)
 - Node needs to be installed on the system.
 (see https://nodejs.org)
 - Gulp needs to be installed globally on the system (npm i gulp -g).

## How to install
1. Clone or download the zip of this repository.
2. Run "npm install" in the main folder directory.
3. Run "gulp build" in the main folder directory.
4. Upload the zip created by previous steps (located in the "dist" folder).

## Usage

### API
[POST] `/acpaasforms/:form` - Submit form
#### Request body (multipart formdata)
```
product=[product uuid]&
subject=[subject]&
message=[message]

[+ attachements]
```

## Module development

Please read the following on how to work with WCM modules before changing anything to this repo.

[Modules manual](https://github.com/hvperdrive/pelorus-cms/blob/develop/readmes/modules.md)
